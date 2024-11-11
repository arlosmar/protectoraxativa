<?php

$animals = env('PATH_ANIMALS', '');
$animals_external = env('PATH_ANIMALS_EXTERNAL', '');
$people = env('PATH_PEOPLE', '');
$news = env('PATH_NEWS', '');

return [
    'images' => [
        'animals' => '/'.$animals,
        'animals_external' => '/'.$animals_external,
        'people' => '/'.$people,
        'news' => '/'.$news
    ],
    'files' => [
        'animals' => $animals,
        'animals_external' => $animals_external,
        'people' => $people,
        'news' => $news
    ]
];
