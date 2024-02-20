ALTER TABLE ONLY "public"."producers"
    ADD COLUMN "user_id" uuid;

ALTER TABLE ONLY "public"."producers"
    ADD CONSTRAINT "producer_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable delete for users based on user_id" ON "public"."producers" FOR DELETE USING ((auth.uid() = user_id));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."producers" FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for users own producers" ON "public"."producers" FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));
