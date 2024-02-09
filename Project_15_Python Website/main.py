# import website folder as a package thanks to __init__.py
from website import create_app

app = create_app()

if __name__  == '__main__':
    # False in production
    app.run(debug=True)