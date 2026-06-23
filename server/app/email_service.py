# from django.core.mail import send_mail, EmailMultiAlternatives
# from django.conf import settings
# from django.template.loader import render_to_string

# def send_subscribe_notification(email):
#     """Уведомление о подписке"""
#     subject = 'Новый подписчик на SoapSo'
#     message = f'Пользователь {email} подписался на новости.'
    
#     send_mail(
#         subject=subject,
#         message=message,
#         from_email=settings.DEFAULT_FROM_EMAIL,
#         recipient_list=[settings.ADMIN_EMAIL],
#         fail_silently=True,
#     )

# def send_contact_notification(name, email, message_text):
#     """Уведомление о сообщении с формы обратной связи"""
#     subject = f'Новое сообщение от {name}'
#     message = f"""
#     Имя: {name}
#     Email: {email}
    
#     Сообщение:
#     {message_text}
#     """
    
#     send_mail(
#         subject=subject,
#         message=message,
#         from_email=settings.DEFAULT_FROM_EMAIL,
#         recipient_list=[settings.ADMIN_EMAIL],
#         fail_silently=True,
#     )

# def send_order_notification(user_email, order_id, total_price, items, address=''):
#     """Уведомление о новом заказе админу"""
#     subject = f'Новый заказ №{order_id} на SoapSo'
    
#     items_text = '\n'.join([
#         f"- {item['product_name']} x{item['quantity']} = {item['total_price']} ₽"
#         for item in items
#     ])
    
#     message = f"""
#     Новый заказ №{order_id}
    
#     Клиент: {user_email}
#     Сумма: {total_price} ₽
#     Адрес: {address or 'Не указан'}
    
#     Товары:
#     {items_text}
    
#     Дата: {__import__('datetime').datetime.now().strftime('%d.%m.%Y %H:%M')}
#     """
    
#     send_mail(
#         subject=subject,
#         message=message,
#         from_email=settings.DEFAULT_FROM_EMAIL,
#         recipient_list=[settings.ADMIN_EMAIL],
#         fail_silently=True,
#     )

# def send_order_confirmation(user_email, order_id, total_price, items, address=''):
#     """Подтверждение заказа клиенту"""
#     subject = f'Заказ №{order_id} принят в обработку'
    
#     items_text = '\n'.join([
#         f"- {item['product_name']} x{item['quantity']} = {item['total_price']} ₽"
#         for item in items
#     ])
    
#     message = f"""
#     Спасибо за заказ на SoapSo!
    
#     Номер заказа: {order_id}
#     Сумма: {total_price} ₽
#     Адрес доставки: {address or 'Не указан'}
    
#     Ваши товары:
#     {items_text}
    
#     Статус: Принят в обработку
    
#     Служба поддержки свяжется с вами в ближайшее время.
    
#     С уважением,
#     SoapSo - Натуральное мыло ручной работы
#     """
    
#     send_mail(
#         subject=subject,
#         message=message,
#         from_email=settings.DEFAULT_FROM_EMAIL,
#         recipient_list=[user_email],
#         fail_silently=True,
#     )