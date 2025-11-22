<?php
// php-backend/config/database.php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

class Database {
    public $connection;
    
    public function __construct() {
        $this->connection = mysqli_connect("localhost", "root", "", "diseno-multimedial");
        
        if (!$this->connection) {
            $this->sendError("Error de conexión: " . mysqli_connect_error());
        }
        
        mysqli_set_charset($this->connection, "utf8");
    }
    
    private function sendError($message) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $message
        ]);
        exit();
    }
    
    public function query($sql) {
        $result = mysqli_query($this->connection, $sql);
        
        if (!$result) {
            $this->sendError("Error en consulta: " . mysqli_error($this->connection));
        }
        
        return $result;
    }
}
?>