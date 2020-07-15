<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Faker;

class GenerateIdeaController extends AbstractController
{
    /**
     * @Route("/api/ideas", name="generate_ideas")
     */
    public function index()
    {

        $faker = Faker\Factory::create();

        $ideas = [];

        for ($i = 0; $i < 10; $i ++){
            $ideas[$i] = [
                'id' => $i,
                'title' => $faker->word,
                'createdAt' => $faker->dateTimeBetween($startDate = '-6 month', $endDate = 'now', $timezone = null),
                'author' => $faker->name,
                'score' => $faker->biasedNumberBetween(0, 50)
            ];
        }
        return  new JsonResponse($ideas);

    }
}
