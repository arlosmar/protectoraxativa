export default function LoadMore({t,handleChange,disabled}){    
  
	return (        
        !disabled &&
        <button className="load-more-button" onClick={handleChange}>
            {t('news.load-more')}
        </button>
	)
}