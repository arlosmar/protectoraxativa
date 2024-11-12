<tr>
	<td>
		<table class="footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
			<tr>
				<td class="content-cell" align="center">
					© {{ config('variables.app-year') }}{{ date('Y') > config('variables.app-year') ? '-'.date('Y') : '' }} {{ config('app.name') }}. {{ __('mail.trans.copyright') }}
				</td>
			</tr>
		</table>
	</td>
</tr>
