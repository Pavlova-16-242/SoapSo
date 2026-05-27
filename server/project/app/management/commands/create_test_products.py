import os
from django.core.management.base import BaseCommand
from django.conf import settings
from app.models import Product

class Command(BaseCommand):
    help = 'Creates test products for the store'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear all existing products before creating new ones',
        )

    def handle(self, *args, **options):
        if options['clear']:
            Product.objects.all().delete()
            self.stdout.write(self.style.WARNING('All existing products deleted'))
        
        products_data = [
            {
                'image': 'products/sea.webp',
                'name': 'Морская свежесть',
                'description': 'с морской солью и водорослями',
                'price': 450.00,
                'size': 'col-span-5 row-span-1', 
                'layout': 'horizontal', 
            },
            {
                'image': 'products/milk.webp',
                'name': 'Овсяное молочко',
                'description': 'с овсяными хлопьями и медом',
                'price': 410.00,
                'size': 'col-span-5 row-span-1',
                'layout': 'horizontal',
            },
            {
                'image': 'products/lavender.webp',
                'name': 'Лавандовое облако',
                'description': 'с лавандой и маслом ши',
                'price': 420.00,
                'size': 'col-span-3 row-span-1',
                'layout': 'vertical',
            },
            {
                'image': 'products/mint.webp',
                'name': 'Мятный бриз',
                'description': 'с мятой и эфирным маслом эвкалипта',
                'price': 430.00,
                'size': 'col-span-3 row-span-1',
                'layout': 'vertical',
            },
            {
                'image': 'products/coal.webp',
                'name': 'Спа-уголь',
                'description': 'с активированным углем и маслом чайного дерева',
                'price': 430.00,
                'size': 'col-span-4 row-span-3',
                'layout': 'vertical',
            },
            {
                'image': 'products/citrus.webp',
                'name': 'Цитрусовый рассвет',
                'description': 'с апельсином и маслом миндаля',
                'price': 440.00,
                'size': 'col-span-2 row-span-4',
                'layout': 'vertical',
            },
            {
                'image': 'products/pink.webp',
                'name': 'Розовая глина',
                'description': 'с розовой глиной и маслом жожоба',
                'price': 410.00,
                'size': 'col-span-4 row-span-4',
                'layout': 'featured',  # Особый дизайн
            },
            {
                'image': 'products/coconut.webp',
                'name': 'Кокосовый рай',
                'description': 'с кокосовым маслом и стружкой кокоса',
                'price': 440.00,
                'size': 'col-span-4 row-span-2',
                'layout': 'horizontal',
            },
            {
                'image': 'products/pine.webp',
                'name': 'Хвойный лес',
                'description': 'с эфирным маслом хвои и зеленой глиной',
                'price': 430.00,
                'size': 'col-span-4 row-span-3',
                'layout': 'overlay',
            },
            {
                'image': 'products/honey.webp',
                'name': 'Мед и прополис',
                'description': 'с медом и экстрактом прополиса',
                'price': 420.00,
                'size': 'col-span-2 row-span-3',
                'layout': 'vertical',
            },
            {
                'image': 'products/flower.webp',
                'name': 'Цветочный букет',
                'description': 'с лепестками роз и маслом ши',
                'price': 450.00,
                'size': 'col-span-4 row-span-3',
                'layout': 'overlay',
            },
            {
                'image': 'products/mix.webp',
                'name': 'Набор "Микс"',
                'description': '3 случайных вида мыла в подарочной упаковке',
                'price': 1100.00,
                'size': 'col-span-10',
                'layout': 'horizontal',
            },
        ]
        
        for product_data in products_data:
            # Проверяем изображение
            image_path = os.path.join(settings.BASE_DIR, 'static', product_data['image'])
            if not os.path.exists(image_path):
                self.stdout.write(self.style.WARNING(f"Image not found: {image_path}"))
                product_data['image'] = None
            
            # Создаем продукт
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults=product_data
            )
            
            if not created:
                for key, value in product_data.items():
                    setattr(product, key, value)
                product.save()
                self.stdout.write(f"Updated: {product.name}")
            else:
                self.stdout.write(self.style.SUCCESS(f"Created: {product.name}"))
        
        self.stdout.write(self.style.SUCCESS(f'Total products: {Product.objects.count()}'))