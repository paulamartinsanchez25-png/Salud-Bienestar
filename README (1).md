# Salud y Bienestar (app instalable)
Archivos: index.html, config.js, manifest.webmanifest, sw.js, icon-192.png, icon-512.png, supabase/schema.sql, supabase/functions/parse-food/index.ts

## 1. Subir a GitHub (publicar la app)
1. Crea cuenta en github.com → New repository → nombre `salud-y-bienestar` → Create.
2. "uploading an existing file" → arrastra TODOS los archivos y la carpeta `supabase` → Commit changes.
3. Settings → Pages → Source: Deploy from a branch → Branch `main` / root → Save.
4. En 1-2 minutos tu app estará en `https://TU-USUARIO.github.io/salud-y-bienestar/`.

## 2. Base de datos y cuenta (Supabase, gratis)
1. supabase.com → New project.
2. SQL Editor → pega `supabase/schema.sql` → Run.
3. Project Settings → API: copia Project URL y anon public key en `config.js` (edítalo en GitHub con el lápiz) → Commit.
4. Authentication → URL Configuration: Site URL = la dirección de tu GitHub Pages.
5. Authentication → Providers → Email activado (puedes desactivar "Confirm email" para probar).

## 3. IA para calcular calorías
Necesitas la CLI de Supabase (supabase.com/docs/guides/cli) y una clave de API de console.anthropic.com (de pago por uso, céntimos al mes):
```
supabase login
supabase link --project-ref TU_REF
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase functions deploy parse-food
```
La clave solo vive en Supabase, nunca en GitHub.

## 4. Instalar en Android
Abre la URL en Chrome → menú ⋮ → Instalar aplicación. Usa la misma cuenta en el ordenador para sincronizar.
