<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mentors', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->foreignId('user_id')->constrained('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('job_title');
            $table->string('experience');
            $table->string('price_per_half_hour');
            $table->string('price_per_hour');
            $table->text('about');
            $table->string('state');
            $table->timestamps();
        });

        Schema::create('mentor_direction', function (Blueprint $table) {
            $table->foreignId('mentor_id')->constrained('mentors')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('direction_id')->constrained('directions')->cascadeOnUpdate()->cascadeOnDelete();
        });

        Schema::create('mentor_service', function (Blueprint $table) {
            $table->foreignId('mentor_id')->constrained('mentors')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('service_id')->constrained('services')->cascadeOnUpdate()->cascadeOnDelete();
        });

        Schema::create('mentor_skill', function (Blueprint $table) {
            $table->foreignId('mentor_id')->constrained('mentors')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('skill_id')->constrained('skills')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentor_skill');
        Schema::dropIfExists('mentor_service');
        Schema::dropIfExists('mentor_direction');
        Schema::dropIfExists('mentors');
    }
};
