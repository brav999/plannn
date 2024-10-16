import express, { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { 
    createTask, 
    getTasks, 
    updateTask, 
    deleteTask 
} from "../controllers/taskController";

const router = express.Router();

// Define tipos mais específicos para o middleware
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        // outros campos do usuário se necessário
    };
}

type AuthMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => Promise<void> | void;

// Rotas
router.get(
    "/", 
    getTasks
);

router.post(
    "/",
    [
        check("title", "Title is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty()
    ],
    createTask
);

router.put(
    "/:id",
    [
        check("id", "Invalid task ID").isMongoId(),
        check("title", "Title is required").optional().not().isEmpty(),
        check("description", "Description is required").optional().not().isEmpty(),
        check("status", "Status must be valid").optional().isIn(['pending', 'in_progress', 'completed'])
    ],
    updateTask
);

router.delete(
    "/:id",
    [
        check("id", "Invalid task ID").isMongoId()
    ],
    deleteTask
);

export default router;