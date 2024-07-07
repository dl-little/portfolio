<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $projects = ProjectResource::collection( Project::all() );
        return Inertia::render('Projects/Index', compact('projects'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Project $project
     *
     * @return \Inertia\Response
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', compact('project'));
    }

    /**
     * Direct to the details page for a specified resource.
     *
     * @param Request $request
     * @param Project $project
     *
     * @return \Inertia\Response
     */
    public function show(Project $project): Response
    {
        return Inertia::render('Projects/Show', compact('project'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:225|min:3',
            'image' => 'required|image',
            'github_url' => 'nullable|string|max:225|min:3',
            'keywords' => 'nullable|string|max:225|min:3',
            'description' => 'nullable|string|max:225|min:3',
        ]);
 
        if ( ! $request->hasFile('image') || ! $request->exists('title') ) {
            return back();
        }

        $image = $request->file('image')->store('projects');

        Project::create([
            'title' => $request->title,
            'image' => $image,
            'slug'  => Str::slug($request->title),
            'github_url' => $request->github_url,
            'keywords' => $request->keywords,
            'description' => $request->description,
            'is_hosted' => $request->is_hosted,
        ]);
 
        return redirect(route('dashboard'))->with('message', 'Project created.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Project $project
     */
    public function update(Request $request, Project $project): RedirectResponse
    {

        $request->validate([
            'title' => 'required|min:3'
        ]);

        $image = $project->image;

        if ( $request->hasFile('image') ) {
            Storage::delete($image);
            $image = $request->file('image')->store('projects');
        }

        $project->update([
            'title' => $request->title,
            'image' => $image,
            'slug' => Str::slug($request->title),
            'keywords' => $request->keywords,
            'description' => $request->description,
            'github_url' => $request->github_url,
            'is_hosted' => $request->is_hosted
        ]);

        return redirect(route('dashboard'))->with('message', 'Project updated.');
    }

    /**
     * Delete the project
     *
     * @param Project $project
     */
    public function destroy(Project $project): RedirectResponse
    {
        Storage::delete($project->image);
        $project->delete();

        return back()->with('message', 'Project deleted.');
    }
}
