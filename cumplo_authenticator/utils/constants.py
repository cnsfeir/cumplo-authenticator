from os import getenv

from dotenv import load_dotenv

load_dotenv()

CUMPLO_LOGIN_URL: str = getenv("CUMPLO_LOGIN_URL", "")
CUMPLO_SIGN_OUT_URL: str = getenv("CUMPLO_SIGN_OUT_URL", "")
AUTHENTICITY_TOKEN_SELECTOR: str = getenv("AUTHENTICITY_TOKEN_SELECTOR", "input[name=authenticity_token]")
SESSION_COOKIE_NAME: str = getenv("SESSION_COOKIE_NAME", "_new_cumplo_session")
