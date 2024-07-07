<?php

use App\Models\Project;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('slug')->nullable();
        });

        $projects = Project::all();
        $slugs    = [];

        foreach ($projects as $project) {
            $project->slug = Str::slug($project->title);
            $count = '';

            while ( in_array($project->slug.$count, $slugs) ) {
                if ( $count == '' ) {
                    $count = 1;
                }
                $count++;
            }

            $project->slug .= $count;
            $slugs[] = $project->slug;
            $project->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
