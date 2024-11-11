@extends('emails.generic')
@section('template')
<div id='contact-email-div'>
	<p>
		<h1 id='title'>{{ __('mail.trans.name') }}</h1>
		{{ isset($values['name']) ? $values['name'] : ''}}
	</p>
	<p>
		<h1 id='title'>{{ __('mail.trans.email') }}</h1>
		{{ isset($values['email']) ? $values['email'] : '' }}
	</p>
	<p>
		<h1 id='title'>{{ __('mail.trans.message') }}</h1>
		{{ isset($values['message']) ? $values['message'] : '' }}
	</p>
</div>
@endsection