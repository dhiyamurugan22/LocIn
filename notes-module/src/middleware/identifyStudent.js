/**
 * In a real learning application, the student's identity would come from a
 * verified session / JWT set by the main authentication module. This module
 * only owns notes, so it just expects that identity to already be resolved
 * and passed along as `X-Student-Id`.
 *
 * Wire this up in your app by replacing this middleware with your real auth
 * middleware, as long as it sets req.studentId before these routes run.
 */
module.exports = function identifyStudent(req, res, next) {
  const studentId = req.header("X-Student-Id") || req.query.studentId;

  if (!studentId) {
    return res.status(401).json({
      error: "Missing student identity. Send an 'X-Student-Id' header.",
    });
  }

  req.studentId = studentId;
  next();
};
