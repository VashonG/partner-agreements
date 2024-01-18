<?php
require 'vendor/autoload.php';
if(isset($_POST))
{
    $request = $_POST['request'];
    $select1 = $_POST['select1'];
    $mailFrom = $_POST['mail'];
    $name = $_POST['name'];
    $contract = $_POST['contract'];
    $othemail = $_POST['oth-email'];
    $message = $_POST['message'];
    $select2 = $_POST['select2'];
    $idnumber = $_POST['idnumber'];
    $description = $_POST['description'];


    



// send mail

    // Create the Transport
    $transport = (new Swift_SmtpTransport('mail.paygeon.io', 465, 'ssl'))
    ->setEncryption('ssl')
    ->setUsername('support@paygeon.io')
    ->setPassword('Popcorn@12');

    ;
    
    // if attachment is uploaded


    $mailer = new Swift_Mailer($transport);

    //Creating message
    $message = (new Swift_Message('Subject'))
        ->setFrom([$mailFrom => $name])
        ->setTo(["youremail@gmail.com" => "reciever Name"])
        ->setBody("Message Body");
    $message->attach(Swift_Attachment::fromPath($_FILES['file']['tmp_name'])->setFilename($_FILES['file']['name']));

    $result = $mailer->send($message);

}
else
{
    echo "error";
}


ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");
error_log( "Hello, errors!" );
