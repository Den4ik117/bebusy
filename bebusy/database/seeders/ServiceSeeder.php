<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $services = [
            ['id' => 1, 'name' => 'Общая консультация', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'Составить план обучения', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'Обучение до трудоустройства', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'name' => 'Помощь с Pet-проектом', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'name' => 'Помощь с тестовым заданием', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6, 'name' => 'Помощь с рабочей задачей', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 7, 'name' => 'Код-ревью', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 8, 'name' => 'Дизайн-ревью', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9, 'name' => 'Резюме-ревью', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 10, 'name' => 'Портфолио-ревью', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 11, 'name' => 'Карьерная консультация', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 12, 'name' => 'Найти работу за рубежом', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 13, 'name' => 'Мок-интервью', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 14, 'name' => 'Мок-интервью на английском', 'created_at' => $now, 'updated_at' => $now],
        ];

        Service::query()->insert($services);
    }
}
