
<?php
        $recaptcha = new \ReCaptcha\ReCaptcha($secret);
        $resp = $recaptcha->setExpectedHostname($_SERVER['SERVER_NAME'])
            ->setExpectedAction($_GET['action'])
            ->setScoreThreshold(0.5)
            ->verify($_GET['token'], $_SERVER['REMOTE_ADDR']);
        header('Content-type:application/json');
        echo json_encode($resp->toArray());

        ?>