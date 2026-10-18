**Repository:** [github.com/ivanmiskic/HarmonicSeries](https://github.com/ivanmiskic/HarmonicSeries) — **`web` branch**

Dark glass UI for running and monitoring harmonic series benchmarks.

**Live (presentation mode):** [offshore.studio/harmonic-series/](https://offshore.studio/harmonic-series/)

The C++ engine lives on the **`master`** branch. Website and lab work happen on **`web`**.

## Branch workflow

**C++ / engine:**

```bash
git checkout master
# edit HarmonicSeries/, include/, Makefile
git commit && git push origin master
```

**Website / lab (this branch):**

```bash
git checkout web
cp deploy/local.env.example deploy/local.env   # once, edit if needed
# edit web/, commit
git push origin web
./scripts/deploy-offshore.sh
```

**Clone web only:**

```bash
git clone -b web https://github.com/ivanmiskic/HarmonicSeries.git
```

## Production deploy

Static export (no FastAPI on the server):

```bash
cp deploy/local.env.example deploy/local.env
./scripts/deploy-offshore.sh
```

`deploy/local.env` is gitignored — SSH host alias, remote path, and public URL stay local.

## Quick start (local dev with live lab)

```bash
# 1. Build C++ binary with CUDA (repo root)
cd ..
make CUDA=1

# 2. API (port 8001)
cd web/api
python -m venv .venv && .venv/bin/pip install -r requirements.txt
HARMONIC_BIN=../../harmonic_series .venv/bin/uvicorn main:app --reload --port 8001

# 3. Frontend (port 3000)
cd ..
cp .env.example .env.local
# set NEXT_PUBLIC_LAB_ENABLED=true in .env.local
npm install && npm run dev
```

Open http://localhost:3000 — homepage and `/dashboard` lab console.

**Distributed runs:** the dashboard can start one CUDA rank on this host. Additional GPUs must run the CLI on peer machines — see [docs/distributed-two-machines.md](../docs/distributed-two-machines.md) or the **Distributed** section in the run launcher.

## Docker

```bash
make CUDA=1
docker compose up --build
```

## systemd (local API only)

```bash
cp systemd/harmonic-web.service.example systemd/harmonic-web.local.service
# Edit WEB_USER, HARMONIC_ROOT, UVICORN_HOST, UVICORN_PORT in the local file
sudo cp systemd/harmonic-web.local.service /etc/systemd/system/harmonic-web.service
sudo systemctl daemon-reload
sudo systemctl enable --now harmonic-web
```

`systemd/*.local.service` is gitignored.
