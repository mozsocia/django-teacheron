# yourapp/management/commands/seed_data.py

import random
from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.posts.models import *
import string
from apps.posts.seed import *
from apps.teacher.seed import *
from apps.student.seed import *


class Command(BaseCommand):

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Seeding data...'))

        create_brands()
        create_categories()
        create_blogs()
        create_teachers()
        create_students()

        self.stdout.write(self.style.SUCCESS('Data seeded successfully!'))
