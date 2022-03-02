<?php
$siteKey = '6LfQbK4eAAAAAKKxrGLVpGkD9Y_YmoJQaD7tQ6fs';
$secret = '6LfQbK4eAAAAALy41IReLibQkO9uGjGgEcHz58Yz';
$pageAction = 'test/v3scores';

// require __DIR__ . '/appengine-https.php';

// // Initiate the autoloader. The file should be generated by Composer.
// // You will provide your own autoloader or require the files directly if you did
// // not install via Composer.
// require_once __DIR__ . '/../vendor/autoload.php';
?>


<span style="font-size:14px;">

    <!DOCTYPE html>
    <html>
    <link rel="stylesheet" href="submit.css">
    <meta name="viewport" content="width=device-width,height=device-height,minimum-scale=1">
    <link rel="shortcut icon" href="https://www.gstatic.com/recaptcha/admin/favicon.ico" type="image/x-icon" />
    <link rel="canonical" href="https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php">
    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "reCAPTCHA demo - \"I'm not a robot\" checkbox",
            "url": "https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php"
        }
    </script>
    <meta name="description" content="reCAPTCHA demo - &quot;I'm not a robot&quot; checkbox" />
    <meta property="og:url" content="https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="reCAPTCHA demo - &quot;I'm not a robot&quot; checkbox" />
    <meta property="og:description" content="reCAPTCHA demo - &quot;I'm not a robot&quot; checkbox" />

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">


    </head>

    <body>
        <ol id="recaptcha-steps">
            <li class="step0">reCAPTCHA script loading</li>
            <li class="step1 hidden"><kbd>grecaptcha.ready()</kbd> fired, calling
                <pre>grecaptcha.execute('<?php echo $siteKey; ?>', {action: '<?php echo $pageAction; ?>'})'</pre>
            </li>
            <li class="step2 hidden">Received token from reCAPTCHA service, sending to our backend with:
                <pre class="token">fetch('./verify.php?token=abc123</pre>
            </li>
            <li class="step3 hidden">Received response from our backend:
                <pre class="response">{"json": "from-backend"}</pre>
            </li>
        </ol>
        <script src="https://www.google.com/recaptcha/api.js?render=<?php echo $siteKey; ?>"></script>
        <script>
            const steps = document.getElementById('recaptcha-steps');
            grecaptcha.ready(function() {
                document.querySelector('.step1').classList.remove('hidden');
                grecaptcha.execute('<?php echo $siteKey; ?>', {
                    action: '<?php echo $pageAction; ?>'
                }).then(function(token) {
                    document.querySelector('.token').innerHTML = 'fetch(\'./verify.php?action=<?php echo $pageAction; ?>&token=\'' + token;
                    document.querySelector('.step2').classList.remove('hidden');

                    fetch('./verify.php?action=<?php echo $pageAction; ?>&token=' + token).then(function(response) {
                        response.json().then(function(data) {
                            document.querySelector('.response').innerHTML = JSON.stringify(data, null, 2);
                            document.querySelector('.step3').classList.remove('hidden');
                        });
                    });
                });
            });
        </script>


        <div>
            Fist Name: <?php echo $_POST["first_name"]; ?><br>
            Last Name:<?php echo $_POST["last_name"]; ?><br>
            Phone:<?php echo $_POST["phone"]; ?><br>
            Email:<?php echo $_POST["email"]; ?><br>
            Message:<?php echo $_POST["message"]; ?><br>
            Thank you!
        </div>

    </body>

    </html>