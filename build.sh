#!/bin/bash
echo "=== Current directory ==="
pwd
echo ""
echo "=== Files in root ==="
ls -la
echo ""
echo "=== Files in project/ ==="
ls -la project/
echo ""
echo "=== Python path ==="
python -c "import sys; print('\n'.join(sys.path))"
echo ""
echo "=== Trying import ==="
python -c "import project; print('project module OK')"
python -c "from project import settings; print('settings OK')"
echo ""
echo "=== Installing requirements ==="
pip install -r requirements.txt
echo ""
echo "=== Running migrate ==="
python manage.py migrate
echo ""
echo "=== Running collectstatic ==="
python manage.py collectstatic --noinput