import { Head } from '@inertiajs/react';
//import React from "react";
import packageJson from '/package.json';

export default function Versions({laravel,php,database}){

    const mui = packageJson.dependencies['@mui/icons-material'].replace('^','');
    const npm = packageJson.dependencies.npm.replace('^','');;
    const react = packageJson.devDependencies.react.replace('^','');; // React.version
    const vite = packageJson.devDependencies.vite.replace('^','');;
    const tailwind = packageJson.devDependencies.tailwindcss.replace('^','');;

    const versions = [laravel,php,database,react,vite,npm,mui,tailwind];
    const names = ['Laravel','PHP','Database','React','Vite','npm','MUI','TailwindCSS'];

    return (
    	<>
        <Head title='Versions'/>
        <main>
            <div id='versions'>
            {
                versions && versions.length > 0 && versions.map((version,i) => (                
                    <pre>
                        {
                            version && version.length > 0 &&               
                            <><b>{names[i]}:</b> {version}<br/></>
                        }
                    </pre>
                ))
            }
            </div>
        </main>
    	</>
    )
}