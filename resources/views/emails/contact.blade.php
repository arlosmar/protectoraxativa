@extends('emails.generic')
@section('template')
<div>
	<p>
		<b>{{ __('mail.trans.name') }}:</b> {{ isset($values['name']) ? $values['name'] : ''}}
	</p>
	<p>
		<b>{{ __('mail.trans.email') }}:</b> {{ isset($values['email']) ? $values['email'] : '' }}
	</p>
	<p>
		<b>{{ __('mail.trans.message') }}:</b><br/>{{ isset($values['message']) ? $values['message'] : '' }}
	</p>
</div>
@endsection