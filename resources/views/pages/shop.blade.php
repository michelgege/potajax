@extends('layouts.app')

@section('content')

<div class="name">
	<h2 class="title">{{ $infos->nom }}</h2>
	<p class="adresse">{{$infos->adresse}}</p>
	<p class="tel">Téléphone: {{$infos->tel}}</p>
	<p class="mail">@: {{$infos->email}}</p>
</div>
<div class="horaires">
	<p> Ouvert les : {{$infos->horaires}}</p>
</div>
<div class="descriptif">
	<p>{{$infos->descriptif}}</p>
</div>





@endsection