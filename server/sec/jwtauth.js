import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { supabase } from '../db/index.js';

const SECRET = process.env.JWT_SECRET;

/**
 * Inizializza la strategia JWT
 */
export function setupJwtAuth(passportInstance) {
  passportInstance.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET
      },
      async (payload, done) => {
        try {
          // Blocca token temporanei (OTP non completato)
          if (payload.stage === 'otp') {
            return done(null, false);
          }

          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', payload.id)
            .single();

          if (error || !user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
}

/**
 * Middleware JWT riutilizzabile
 */
export const requireJwtAuth = passport.authenticate('jwt', {
  session: false
});

export default passport;