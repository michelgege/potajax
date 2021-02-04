<?php

namespace App\Shops;

use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    //
    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}
