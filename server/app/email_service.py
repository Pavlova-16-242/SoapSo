from django.core.mail import send_mail
from django.conf import settings
import threading

def _send_mail_async(subject, message, recipient_list):
    """Отправка письма в отдельном потоке"""
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipient_list,
            fail_silently=True,
        )
    except Exception as e:
        print(f"Email error: {e}")

def send_in_background(subject, message, recipient_list):
    """Запуск отправки в фоновом потоке"""
    thread = threading.Thread(
        target=_send_mail_async,
        args=(subject, message, recipient_list),
        daemon=True
    )
    thread.start()

def send_order_notification(user_email, order_id, total_price, items, address=''):
    subject = f'Новый заказ №{order_id} на SoapSo'
    
    items_text = '\n'.join([
        f"- {item['product_name']} x{item['quantity']} = {item['total_price']} ₽"
        for item in items
    ])
    
    message = f"""
    Новый заказ №{order_id}
    
    Клиент: {user_email}
    Сумма: {total_price} ₽
    Адрес: {address or 'Не указан'}
    
    Товары:
    {items_text}
    """
    
    send_in_background(subject, message, [settings.ADMIN_EMAIL])

def send_order_confirmation(user_email, order_id, total_price, items, address=''):
    subject = f'Заказ №{order_id} принят в обработку'
    
    items_text = '\n'.join([
        f"- {item['product_name']} x{item['quantity']} = {item['total_price']} ₽"
        for item in items
    ])
    
    message = f"""
    Спасибо за заказ на SoapSo!
    
    Номер заказа: {order_id}
    Сумма: {total_price} ₽
    Адрес доставки: {address or 'Не указан'}
    
    Ваши товары:
    {items_text}
    
    Статус: Принят в обработку
    Служба поддержки свяжется с вами.
    
    С уважением,
    SoapSo
    """
    
    send_in_background(subject, message, [user_email])

def send_subscribe_notification(email):
    subject = 'Новый подписчик на SoapSo'
    message = f'Пользователь {email} подписался на новости.'
    send_in_background(subject, message, [settings.ADMIN_EMAIL])

def send_contact_notification(name, email, message_text):
    subject = f'Новое сообщение от {name}'
    message = f"""
    Имя: {name}
    Email: {email}
    Сообщение: {message_text}
    """
    send_in_background(subject, message, [settings.ADMIN_EMAIL])