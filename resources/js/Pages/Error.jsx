
export default function Error({}){
	
	return (
		<main>
			<div className='w-full text-center mt-8'>
				<div className='title'>
					Error
				</div>
				<div className='mt-8'>
					<a 
						className='error-button'
						href={window.referrer ? window.referrer : route('home')}
					>
						<span className='pb-4'><big><big><big><big>&#8592;</big></big></big></big></span>
					</a>
				</div>
			</div>
		</main>
	)
}