import { Router } from "express";
import analyzeRouter from "./analyze.js";
import translateRouter from "./translate.js";
import wordDetailRouter from "./wordDetail.js";
import grammarAnalysisRouter from "./grammarAnalysis.js";
import batchTranslateRouter from "./batchTranslate.js";
import chatRouter from "./chat.js";
import imageToTextRouter from "./imageToText.js";
import ttsRouter from "./tts.js";
import codeGateRouter from "./codeGate.js";
import dictionaryRouter from "./dictionary.js";
import authRouter from "./auth.js";
import oauthRouter from "./oauth.js";
import historyRouter from "./history.js";
import learningStatsRouter from "./learningStats.js";
import vocabularyRouter from "./vocabulary.js";
import packsRouter from "./packs.js";
import srsRouter from "./srs.js";
import dailyChallengeRouter from "./dailyChallenge.js";
import jlptReadinessRouter from "./jlptReadiness.js";
import wordExamplesRouter from "./wordExamples.js";
import sentenceGenerationRouter from "./sentenceGeneration.js";
import subscriptionRouter from "./subscription.js";
import creditsRouter from "./credits.js";
import asianPaymentsRouter from "./asianPayments.js";
import mobileRouter from "./mobile.js";
import coursesRouter from "./courses.js";
import placementTestRouter from "./placementTest.js";
import analyzedVocabularyRouter from "./analyzedVocabulary.js";
import userStatsRouter from "./userStats.js";
import profileRouter from "./profile.js";
import paymentMethodsRouter from "./paymentMethods.js";
import topicsRouter from "./topics.js";
import contentRouter from "./content.js";
import adminContentRouter from "./adminContent.js";
import listeningRouter from "./listening.js";
import adminListeningRouter from "./adminListening.js";
import adminCoursesRouter from "./adminCourses.js";
import adminUsersRouter from "./adminUsers.js";
import grammarMatchRouter from "./grammarMatch.js";

const router = Router();

// Gemini proxy routes
router.use("/analyze", analyzeRouter);
router.use("/translate", translateRouter);
router.use("/word-detail", wordDetailRouter);
router.use("/grammar-analysis", grammarAnalysisRouter);
router.use("/batch-translate", batchTranslateRouter);
router.use("/chat", chatRouter);
router.use("/image-to-text", imageToTextRouter);
router.use("/tts", ttsRouter);
router.use("/dictionary", dictionaryRouter);
router.use("/grammar", grammarMatchRouter);

// Auth routes
router.use("/auth/code-gate", codeGateRouter);
router.use("/auth", authRouter);
router.use("/auth", oauthRouter);

// User data routes (require auth)
router.use("/history", historyRouter);
router.use("/learning-stats", learningStatsRouter);
router.use("/vocabulary", vocabularyRouter);
router.use("/vocabulary/analyzed", analyzedVocabularyRouter);
router.use("/user/stats", userStatsRouter);

// Learning system routes
router.use("/courses", coursesRouter);
router.use("/placement-test", placementTestRouter);
router.use("/packs", packsRouter);
router.use("/srs", srsRouter);
router.use("/daily-challenge", dailyChallengeRouter);
router.use("/jlpt-readiness", jlptReadinessRouter);
router.use("/words", wordExamplesRouter);
router.use("/sentences", sentenceGenerationRouter);

// Profile routes (require auth)
router.use("/me/profile", profileRouter);

// Subscription & Payment routes (require auth)
router.use("/subscription", subscriptionRouter);
router.use("/credits", creditsRouter);
router.use("/payments", asianPaymentsRouter);
router.use("/payment-methods", paymentMethodsRouter);

// Mobile-optimized routes (require auth)
router.use("/mobile", mobileRouter);

// Content library routes
router.use("/topics", topicsRouter);
router.use("/content", contentRouter);
router.use("/admin/content", adminContentRouter);
router.use("/listening", listeningRouter);
router.use("/admin/listening", adminListeningRouter);
router.use("/admin/courses", adminCoursesRouter);
router.use("/admin/users", adminUsersRouter);

export default router;
