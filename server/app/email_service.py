from django.core.mail import send_mail
from django.conf import settings
import threading

def _send_mail_async(subject, message, recipient_list):
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
    thread = threading.Thread(
        target=_send_mail_async,
        args=(subject, message, recipient_list),
        daemon=True
    )
    thread.start()

def send_subscribe_notification(email):
    send_in_background(
        f'Новый подписчик: {email}',
        f'Пользователь {email} подписался на новости.',
        [settings.ADMIN_EMAIL]
    )

def send_contact_notification(name, email, message_text):
    send_in_background(
        f'Сообщение от {name}',
        f'Имя: {name}\nEmail: {email}\n\n{message_text}',
        [settings.ADMIN_EMAIL]
    )

def send_order_notification(user_email, order_id, total_price, items, address=''):
    items_text = '\n'.join([
        f"- {item['product_name']} x{item['quantity']} = {item['total_price']} ₽"
        for item in items
    ])
    send_in_background(
        f'Новый заказ №{order_id}',
        f'Заказ №{order_id}\nКлиент: {user_email}\nСумма: {total_price} ₽\nАдрес: {address or "Нет"}\n\n{items_text}',
        [settings.ADMIN_EMAIL]
    )

def send_order_confirmation(user_email, order_id, total_price, items, address=''):
    items_text = '\n'.join([
        f"- {item['product_name']} x{item['quantity']} = {item['total_price']} ₽"
        for item in items
    ])
    send_in_background(
        f'Заказ №{order_id} принят',
        f'Спасибо за заказ!\n\nНомер: {order_id}\nСумма: {total_price} ₽\nАдрес: {address or "Нет"}\n\n{items_text}\n\nСтатус: В обработке',
        [user_email]
    )