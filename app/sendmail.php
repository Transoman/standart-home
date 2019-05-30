<?php
  $SITE_TITLE = 'Standard Home';

  if ( isset($_POST) ) {
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $surname = isset($_POST['surname']) ? htmlspecialchars(trim($_POST['surname'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $product_name = isset($_POST['product_name']) ? htmlspecialchars(trim($_POST['product_name'])) : '';
    $products_name = isset($_POST['products_name']) ? $_POST['products_name'] : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
    $subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';
    $address = isset($_POST['address']) ? htmlspecialchars(trim($_POST['address'])) : '';
    $legal_address = isset($_POST['legal_address']) ? htmlspecialchars(trim($_POST['legal_address'])) : '';
    $inn = isset($_POST['inn']) ? htmlspecialchars(trim($_POST['inn'])) : '';

    $to = 'Elena357910@yandex.com';
    $no_reply = 'no-reply@silk-its.com';

    $headers = "From: $SITE_TITLE \r\n";
    $headers .= "MIME-Version: 1.0 \r\n";
    $headers .= "Reply-To: $email ? $email : $no_reply \r\n";
    $headers .= "Content-Type: text/html; charset=utf-8\r\n";

    $data = '<h1>'.$subject."</h1>";
    if ($name) {
      $data .= 'Имя: '.$name." " .$surname. "<br>";
    }
    if ($email) {
      $data .= 'Email: '.$email."<br>";
    }
    if ($phone) {
      $data .= 'Телефон: '.$phone."<br>";
    }
    if ($product_name) {
      $data .= 'Товар: '.$product_name."<br>";
    }
    if ($products_name) {
      foreach ($products_name as $item) {
        $data .= 'Товар: '.$item."<br>";
      }
    }
    if ($address) {
      $data .= 'Адрес: '.$address."<br>";
    }
    if ($legal_address) {
      $data .= 'Юридический адрес: '.$legal_address."<br>";
    }
    if ($inn) {
      $data .= 'ИНН: '.$inn."<br>";
    }
    if ($message) {
      $data .= 'Сообщение: <p>'.$message."</p><br>";
    }

    $message = "<div style='background:#ccc;border-radius:10px;padding:20px;'>
        ".$data."
        <br>\n
        <hr>\n
        <br>\n
        <small>это сообщение было отправлено с сайта ".$SITE_TITLE.", отвечать на него не надо</small>\n</div>";
    $send = mail($to, $subject, $message, $headers);

    if ( $send ) {
      echo '';
    } else {
        echo '<div class="error">Ошибка отправки формы</div>';
    }

  }
  else {
      echo '<div class="error">Ошибка, данные формы не переданы.</div>';
  }
  die();
?>