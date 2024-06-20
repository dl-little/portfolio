<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::beginTransaction();

        DB::table('users')
            ->insert(
                array(
                    'email' => config('app.admin_email'),
                    'name'  => config('app.admin_name'),
                    'password' => Hash::make(config('app.admin_password')),
                )
            );

        DB::commit();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
