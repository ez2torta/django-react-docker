# Generated by Django 2.0.13 on 2019-08-16 01:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_auto_20190815_1851'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ticket',
            old_name='User',
            new_name='user',
        ),
    ]
