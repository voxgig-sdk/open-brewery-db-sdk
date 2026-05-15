package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBreweryEntityFunc func(client *OpenBreweryDbSDK, entopts map[string]any) OpenBreweryDbEntity

