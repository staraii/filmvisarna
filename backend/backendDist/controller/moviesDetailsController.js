var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../index.js";
const moviesDetailsController = {
    getMovieDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId } = req.params;
            try {
                const [result] = yield db.query("SELECT * FROM fullMovies WHERE id = ?", [movieId]);
                res.json({ success: result });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ success: false, error: error.message });
                }
                else {
                    res.status(500).json({ success: false, error: "Unknown error occurred" });
                }
            }
        });
    },
};
export default moviesDetailsController;
//# sourceMappingURL=moviesDetailsController.js.map