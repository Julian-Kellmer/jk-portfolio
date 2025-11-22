<?php
// php-backend/api/publicacion.php
require_once '../config/database.php';

$database = new Database();
$db = $database->connection;

// Obtener ID de la URL
$id_publicacion = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id_publicacion <= 0) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'ID de publicación inválido'
    ]);
    exit();
}

// Obtener publicación específica
$sql = "SELECT 
            p.*, 
            u.nombre as autor_nombre,
            u.apellido as autor_apellido
        FROM publicacion p 
        LEFT JOIN usuario u ON p.id_user = u.id_user 
        WHERE p.id_publicacion = $id_publicacion
        LIMIT 1";

$resultado = $database->query($sql);
$publicacion = mysqli_fetch_assoc($resultado);

if (!$publicacion) {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'error' => 'Publicación no encontrada'
    ]);
    exit();
}

// Obtener herramientas de esta publicación
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

// Obtener comentarios
$sql_comentarios = "SELECT 
                    c.detalle,
                    c.fecha_hora,
                    u.nombre,
                    u.apellido
                FROM comentarios c
                INNER JOIN usuario u ON c.id_user = u.id_user
                WHERE c.id_publicacion = $id_publicacion
                ORDER BY c.fecha_hora DESC";

$result_comentarios = $database->query($sql_comentarios);
$publicacion['comentarios'] = mysqli_fetch_all($result_comentarios, MYSQLI_ASSOC);

// Enviar respuesta JSON
echo json_encode([
    'success' => true,
    'data' => $publicacion
]);
?>