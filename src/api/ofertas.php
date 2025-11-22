<?php
// php-backend/api/ofertas.php
require_once '../config/database.php';

$database = new Database();
$db = $database->connection;

$sql = "SELECT 
            o.*,
            u.nombre as empleador_nombre,
            u.apellido as empleador_apellido
        FROM oferta_trabajo o
        LEFT JOIN usuario u ON o.id_usuario = u.id_user
        WHERE o.Estado = 'Abierto'
        ORDER BY o.fecha_de_publicacion DESC";

$resultado = $database->query($sql);
$ofertas = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

echo json_encode([
    'success' => true,
    'data' => $ofertas,
    'total' => count($ofertas)
]);
?>