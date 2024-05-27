<?php

namespace App\Helpers;
use Illuminate\Support\Facades\Route;

class Routes
{
	public static function getRoutePaths(): array {
		$paths = [];
 
		foreach( Route::getRoutes() as $route ) {
			$paths[] = $route->getName();
		}

		return $paths;
	}
}
