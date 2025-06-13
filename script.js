        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        const box = 20; 
        let snake = [{ x: 10 * box, y: 10 * box }];
        let direction = "RIGHT";
        let food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
        let score = 0;

        document.addEventListener("keydown", changeDirection);

        function changeDirection(event) {
            if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
            else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
            else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
            else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        }

        function drawGame() {
            ctx.fillStyle = "lightgray";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw snake (Head = Green, Tail = Dark Green)
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = i === 0 ? "lime" : "darkgreen";
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                ctx.strokeStyle = "lightgray";
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }

            // Draw food (Red Apple)
            ctx.fillStyle = "red";
            ctx.fillRect(food.x, food.y, box, box);

            // Move the snake
            let headX = snake[0].x;
            let headY = snake[0].y;

            if (direction === "UP") headY -= box;
            if (direction === "DOWN") headY += box;
            if (direction === "LEFT") headX -= box;
            if (direction === "RIGHT") headX += box;

            // Check if snake eats food
            if (headX === food.x && headY === food.y) {
                score += 1;
               
                    
                document.getElementById("score").innerText = score;
                food = {
                    x: Math.floor(Math.random() * 20) * box,
                    y: Math.floor(Math.random() * 20) * box
                };
            } else {
                snake.pop(); // Remove tail if food is not eaten
            }

            let newHead = { x: headX, y: headY };

            if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height || collision(newHead, snake)) {
                clearInterval(game);
                alert("Game Over! Your score: " + score +"🏆");
                location.reload();
            }
           
            snake.unshift(newHead);
        }
        
        function collision(head, array) {
            for (let i = 1; i < array.length; i++) {
                if (head.x === array[i].x && head.y === array[i].y) return true;
            }
            return false;
        }
        
        let game = setInterval(drawGame, 200); // Slightly slower movement
    