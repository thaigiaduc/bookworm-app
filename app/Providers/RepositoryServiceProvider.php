<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\RepositoryInterface; 
use App\Repositories\Book\BookInterface; 
use App\Repositories\Book\BookRepository; 
use App\Repositories\Author\AuthorRepository;
use App\Repositories\BaseRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(RepositoryInterface::class, BaseRepository::class);
        $this->app->bind(BookInterface::class, BookRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
