# OpenBreweryDb SDK feature factory

from openbrewerydb_sdk.feature.base_feature import OpenBreweryDbBaseFeature
from openbrewerydb_sdk.feature.test_feature import OpenBreweryDbTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OpenBreweryDbBaseFeature(),
        "test": lambda: OpenBreweryDbTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
