<?php
// php-backend/api/publicaciones.php
require_once '../config/database.php';

$database = new Database();
$db = $database->connection;

// Obtener todas las publicaciones con sus relaciones
$sql = "SELECT 
            p.*, 
            u.nombre as autor_nombre,
            u.apellido as autor_apellido
        FROM publicacion p 
        LEFT JOIN usuario u ON p.id_user = u.id_user 
        ORDER BY p.id_publicacion DESC";

$resultado = $database->query($sql);
$publicaciones = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

// Para cada publicación, obtener sus herramientas
foreach ($publicaciones as &$publicacion) {
    $id_publicacion = $publicacion['id_publicacion'];
    
    // Obtener herramientas
    $sql_herramientas = "SELECT h.* 
                        FROM herramientas h
                        INNER JOIN publicacion_herramienta ph ON h.id_herramienta = ph.id_herramienta
                        WHERE ph.id_publicacion = $id_publicacion";
    
    $result_herramientas = $database->query($sql_herramientas);
    $publicacion['herramientas'] = mysqli_fetch_all($result_herramientas, MYSQLI_ASSOC);
    
    // Obtener participantes
    $sql_participantes = "SELECT 
                            u.nombre, 
                            u.apellido, 
                            rp.detalle as rol
                        FROM participacion_publicacion pp
                        INNER JOIN usuario u ON pp.id_user = u.id_user
                        INNER JOIN rol_proyecto rp ON pp.id_rol_proyecto = rp.id_rolProyecto
                        WHERE pp.id_publicacion = $id_publicacion";
    
    $result_participantes = $database->query($sql_participantes);
    $publicacion['participantes'] = mysqli_fetch_all($result_participantes, MYSQLI_ASSOC);
}

// Enviar respuesta JSON
echo json_encode([
    'success' => true,
    'data' => $publicaciones,
    'total' => count($publicaciones)
]);
?>