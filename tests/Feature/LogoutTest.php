<?php

declare(strict_types = 1);

it('has logout page', function () {
    $response = $this->get('/logout');

    $response->assertStatus(200);
});
