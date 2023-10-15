<?php

    //pdo hjälper till att nå databasen.
    //initiera med länk till databasen. 
    $pdo = new PDO('sqlite:db.db');

    //query för att få all info från "aktiviteter" -table.
    $statement = $pdo->query("SELECT * FROM aktiviteter");

    //Kör statement
    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);

    print($rows);

    echo "<ul>";
    foreach($rows as $row => $aktivitet){
        echo "<li>".$aktivitet["rubrik"]."</li>";

    }
    echo "</ul>";

 ?>
