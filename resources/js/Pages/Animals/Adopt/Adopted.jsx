import Carousel from 'react-material-ui-carousel';

export default function Adopted({t,adopted,images_path}){

    console.log(adopted)
    return (
        <>
        <h1 className='title-subsection'>
            {t('animals.adopt.adopted.title')}
        </h1>
        <Carousel>
            {
                adopted && adopted.length > 0 && adopted.map((animal,index) => {
                    
                    if(animal.image.length > 0){
                        return (
                            <img src={images_path+animal?.image}/> 
                        )
                    }
                })
            }
        </Carousel>
        </>
    )
}