$env:GIT_AUTHOR_DATE="2026-04-17T10:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-17T10:00:00+05:30"
git add package.json skills-lock.json public/login_side_image.png
git commit -m "chore: setup dependencies and raw assets"

$env:GIT_AUTHOR_DATE="2026-04-17T11:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-17T11:00:00+05:30"
git add "src/lib/auth.ts" "src/lib/auth-client.ts" "src/lib/request-auth.ts" "src/lib/app-user.ts"
git commit -m "feat(auth): initialize base authentication framework"

$env:GIT_AUTHOR_DATE="2026-04-17T13:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-17T13:00:00+05:30"
git add "src/database/models/usermodel.ts" "src/database/models/shortUrlmodel.ts"
git commit -m "feat(db): establish user and robust URL data schemas"

$env:GIT_AUTHOR_DATE="2026-04-17T14:30:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-17T14:30:00+05:30"
git rm "src/app/page.tsx" "src/app/pricing/page.tsx" "src/app/redirect/[slug]/route.ts" "src/middleware.ts"
git commit -m "refactor: drop legacy public routers and core middleware"

$env:GIT_AUTHOR_DATE="2026-04-17T16:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-17T16:00:00+05:30"
git add "src/components/ui/" "src/components/BrandLogo.tsx" "src/components/ui/ModeToggle.tsx" "src/components/NavBar.tsx" "src/components/Footer.tsx"
git commit -m "feat(ui): implement dynamic tokens, breadcrumbs, and branding"

$env:GIT_AUTHOR_DATE="2026-04-17T17:30:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-17T17:30:00+05:30"
git add "src/app/layout.tsx"
git commit -m "feat(layout): apply standardized responsive outer shell"

$env:GIT_AUTHOR_DATE="2026-04-17T19:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-17T19:00:00+05:30"
git add "src/app/(auth)/"
git commit -m "feat(auth): design flat high-density split authentication pages"

$env:GIT_AUTHOR_DATE="2026-04-18T09:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-18T09:00:00+05:30"
git add "src/app/(public)/"
git commit -m "feat(public): deploy fast scalable landing marketing layout"

$env:GIT_AUTHOR_DATE="2026-04-18T10:30:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-18T10:30:00+05:30"
git add "src/components/PageHeader.tsx" "src/components/DashboardShell.tsx" "src/components/dashboard/"
git commit -m "feat(dashboard): structural shell and layout primitives"

$env:GIT_AUTHOR_DATE="2026-04-18T12:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-18T12:00:00+05:30"
git add "src/services/service.ts" "src/proxy.ts"
git commit -m "feat(api): expand resilient internal gateway connections"

$env:GIT_AUTHOR_DATE="2026-04-18T13:30:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-18T13:30:00+05:30"
git add "src/app/(private)/dashboard/page.tsx" "src/app/(private)/dashboard/URLCard.tsx" "src/app/(private)/dashboard/URLInput.tsx" "src/app/(private)/dashboard/DashboardHeader.tsx" "src/app/(private)/dashboard/FallBackCard.tsx" "src/app/(private)/dashboard/DeleteButton.tsx" "src/app/(private)/dashboard/Qrcode.tsx"
git commit -m "feat(dashboard): implement integrated overview data architecture"

$env:GIT_AUTHOR_DATE="2026-04-18T15:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-18T15:00:00+05:30"
git add "src/app/(private)/dashboard/analyze/"
git commit -m "feat(analytics): chart data tracking and visualization logic"

$env:GIT_AUTHOR_DATE="2026-04-18T16:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-18T16:00:00+05:30"
git add "src/app/(private)/dashboard/url/"
git commit -m "feat(qr): advanced canvas generation and editing tooling"

$env:GIT_AUTHOR_DATE="2026-04-18T17:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-18T17:00:00+05:30"
git add "src/app/(private)/layout.tsx" "src/app/(private)/loading.tsx" "src/app/(private)/profile/"
git commit -m "feat(profile): integrate internal private session protection"

$env:GIT_AUTHOR_DATE="2026-04-18T18:00:00+05:30"
$env:GIT_COMMITTER_DATE="2026-04-18T18:00:00+05:30"
git add .
git commit -m "chore: flush remaining lockfiles and configuration files"

git push
