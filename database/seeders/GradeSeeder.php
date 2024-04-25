<?php

namespace Database\Seeders;

use App\Models\Grade;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    public function run(): void
    {
        Grade::query()->create(['name' => 'Junior']);
        Grade::query()->create(['name' => 'Middle']);
        Grade::query()->create(['name' => 'Senior']);
    }
}
