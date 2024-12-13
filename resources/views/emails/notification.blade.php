@extends('emails.generic')
@section('template')
<div>
@if(isset($title) && !empty($title))
	<h1 style='text-align:center;'>{{ $title }}</h1> 
@endif
@if(isset($message) && !empty($message))
	{{ $message }}
@endif
</div>
@endsection