<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//         $this->call(UserSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(CitiesSeeder::class);
        $this->call(CountriesSeeder::class);
        $this->call(CategoriesSeeder::class);
        $this->call(SubCategoriesSeeder::class);
        $this->call(UnitsSeeder::class);
        $this->call(ShopsSeeder::class);
       

//        factory( App\Users\Moderator::class, 10)->create();
//        factory(App\Users\Manager::class, 10)->create();
        //factory(App\User::class, 10)->create();
        //factory(App\Shops\Shop::class, 200)->create();
        factory(App\Review::class, 200)->create();
//        factory(App\Products\Product::class, 100)->create();

        //factory(App\Product::class, 10)->create();
    }
}
