# OpenBreweryDb SDK feature factory

from openbrewerydb_sdk.feature.base_feature import OpenBreweryDbBaseFeature
from openbrewerydb_sdk.feature.ratelimit_feature import OpenBreweryDbRatelimitFeature
from openbrewerydb_sdk.feature.retry_feature import OpenBreweryDbRetryFeature
from openbrewerydb_sdk.feature.test_feature import OpenBreweryDbTestFeature
from openbrewerydb_sdk.feature.timeout_feature import OpenBreweryDbTimeoutFeature


_FEATURES = {
    "base": lambda: OpenBreweryDbBaseFeature(),
    "ratelimit": lambda: OpenBreweryDbRatelimitFeature(),
    "retry": lambda: OpenBreweryDbRetryFeature(),
    "test": lambda: OpenBreweryDbTestFeature(),
    "timeout": lambda: OpenBreweryDbTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
