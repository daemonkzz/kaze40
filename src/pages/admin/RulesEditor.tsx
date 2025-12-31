import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Loader2,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Pencil,
  BookOpen,
  FolderOpen,
  FileText,
  Eye,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { MainCategory, SubCategory, Rule } from '@/types/rules';
import { kazeRulesData } from '@/data/rulesData';

// Default rules data to import
const defaultRulesData: MainCategory[] = kazeRulesData;

const RulesEditorContent = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  
  const [rulesId, setRulesId] = useState<string | null>(null);
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [originalCategories, setOriginalCategories] = useState<MainCategory[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  
  // UI State
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedSubCategories, setExpandedSubCategories] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<{ type: 'category' | 'subcategory' | 'rule'; id: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'category' | 'subcategory' | 'rule'; id: string; parentId?: string; subParentId?: string } | null>(null);
  const [importConfirm, setImportConfirm] = useState(false);

  // Preview state
  const [previewExpandedCats, setPreviewExpandedCats] = useState<string[]>([]);
  const [previewExpandedSubs, setPreviewExpandedSubs] = useState<string[]>([]);

  // Load rules data
  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('rules')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error loading rules:', error);
        toast.error('Kurallar yüklenirken hata oluştu');
        return;
      }

      if (data) {
        setRulesId(data.id);
        const loadedCategories = (data.data as MainCategory[]) || [];
        setCategories(loadedCategories);
        setOriginalCategories(JSON.parse(JSON.stringify(loadedCategories))); // Deep copy for comparison
        setLastUpdated(data.updated_at);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Kurallar yüklenirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('rules')
        .update({
          data: categories,
          updated_by: user?.id,
        })
        .eq('id', rulesId!);

      if (error) {
        console.error('Save error:', error);
        toast.error('Kurallar kaydedilirken hata oluştu');
        return;
      }

      toast.success('Kurallar başarıyla kaydedildi');
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Kurallar kaydedilirken hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImportDefaults = () => {
    setCategories(defaultRulesData);
    setOriginalCategories(JSON.parse(JSON.stringify(defaultRulesData))); // Deep copy
    setImportConfirm(false);
    toast.success('Varsayılan kurallar içe aktarıldı. Kaydetmeyi unutmayın!');
  };

  // Category operations
  const addCategory = () => {
    const newId = String(categories.length + 1);
    const newCategory: MainCategory = {
      id: newId,
      title: 'Yeni Kategori',
      subCategories: [],
    };
    setCategories([...categories, newCategory]);
    setExpandedCategories(new Set([...expandedCategories, newId]));
    setEditingItem({ type: 'category', id: newId });
  };

  const updateCategory = (id: string, updates: Partial<MainCategory>) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, ...updates } : cat
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setDeleteConfirm(null);
  };

  // SubCategory operations
  const addSubCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const newId = `${categoryId}.${category.subCategories.length + 1}`;
    const newSubCategory: SubCategory = {
      id: newId,
      title: 'Yeni Alt Kategori',
      description: 'Bu bölümdeki kurallar aşağıda listelenmiştir.',
      rules: [],
    };

    updateCategory(categoryId, {
      subCategories: [...category.subCategories, newSubCategory],
    });
    setExpandedSubCategories(new Set([...expandedSubCategories, newId]));
    setEditingItem({ type: 'subcategory', id: newId });
  };

  const updateSubCategory = (categoryId: string, subCategoryId: string, updates: Partial<SubCategory>) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    updateCategory(categoryId, {
      subCategories: category.subCategories.map(sub =>
        sub.id === subCategoryId ? { ...sub, ...updates } : sub
      ),
    });
  };

  const deleteSubCategory = (categoryId: string, subCategoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    updateCategory(categoryId, {
      subCategories: category.subCategories.filter(sub => sub.id !== subCategoryId),
    });
    setDeleteConfirm(null);
  };

  // Rule operations
  const addRule = (categoryId: string, subCategoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const subCategory = category.subCategories.find(s => s.id === subCategoryId);
    if (!subCategory) return;

    const newId = `${subCategoryId}.${subCategory.rules.length + 1}`;
    const newRule: Rule = {
      id: newId,
      title: 'Yeni Kural',
      description: 'Kural açıklaması...',
      lastUpdate: '',
    };

    updateSubCategory(categoryId, subCategoryId, {
      rules: [...subCategory.rules, newRule],
    });
    setEditingItem({ type: 'rule', id: newId });
  };

  const updateRule = (categoryId: string, subCategoryId: string, ruleId: string, updates: Partial<Rule>) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const subCategory = category.subCategories.find(s => s.id === subCategoryId);
    if (!subCategory) return;

    // Add lastUpdate when editing
    const updatesWithDate = {
      ...updates,
      lastUpdate: new Date().toISOString(),
    };

    updateSubCategory(categoryId, subCategoryId, {
      rules: subCategory.rules.map(rule =>
        rule.id === ruleId ? { ...rule, ...updatesWithDate } : rule
      ),
    });
  };

  const deleteRule = (categoryId: string, subCategoryId: string, ruleId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const subCategory = category.subCategories.find(s => s.id === subCategoryId);
    if (!subCategory) return;

    updateSubCategory(categoryId, subCategoryId, {
      rules: subCategory.rules.filter(rule => rule.id !== ruleId),
    });
    setDeleteConfirm(null);
  };

  // Toggle functions
  const toggleCategory = (id: string) => {
    const newSet = new Set(expandedCategories);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedCategories(newSet);
  };

  const toggleSubCategory = (id: string) => {
    const newSet = new Set(expandedSubCategories);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedSubCategories(newSet);
  };

  // Preview toggles
  const togglePreviewCat = (id: string) => {
    setPreviewExpandedCats(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const togglePreviewSub = (id: string) => {
    setPreviewExpandedSubs(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Count stats
  const totalCategories = categories.length;
  const totalSubCategories = categories.reduce((acc, cat) => acc + cat.subCategories.length, 0);
  const totalRules = categories.reduce((acc, cat) => 
    acc + cat.subCategories.reduce((subAcc, sub) => subAcc + sub.rules.length, 0), 0
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Kurallar Düzenleyici</h2>
          <p className="text-muted-foreground">
            {totalCategories} kategori, {totalSubCategories} alt kategori, {totalRules} kural
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setImportConfirm(true)}
          >
            <Download className="w-4 h-4 mr-2" />
            Varsayılanları Yükle
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Kaydet
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="editor">
            <Pencil className="w-4 h-4 mr-2" />
            Düzenleyici
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4 mr-2" />
            Önizleme
          </TabsTrigger>
        </TabsList>

        {/* Editor Tab */}
        <TabsContent value="editor" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={addCategory}>
              <Plus className="w-4 h-4 mr-2" />
              Kategori Ekle
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-4 pr-4">
              {categories.map((category) => (
                <div key={category.id} className="border border-border rounded-lg bg-card">
                  <Collapsible
                    open={expandedCategories.has(category.id)}
                    onOpenChange={() => toggleCategory(category.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50">
                        <GripVertical className="w-5 h-5 text-muted-foreground" />
                        {expandedCategories.has(category.id) ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                        <FolderOpen className="w-5 h-5 text-primary" />
                        
                        {editingItem?.type === 'category' && editingItem.id === category.id ? (
                          <Input
                            value={category.title}
                            onChange={(e) => updateCategory(category.id, { title: e.target.value })}
                            onBlur={() => setEditingItem(null)}
                            onKeyDown={(e) => e.key === 'Enter' && setEditingItem(null)}
                            autoFocus
                            className="max-w-xs"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <span className="font-semibold text-lg flex-1">{category.title}</span>
                        )}

                        <Badge variant="secondary">
                          {category.subCategories.length} alt kategori
                        </Badge>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingItem({ type: 'category', id: category.id });
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm({ type: 'category', id: category.id });
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addSubCategory(category.id)}
                          className="ml-10"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Alt Kategori Ekle
                        </Button>

                        {category.subCategories.map((subCategory) => (
                          <div key={subCategory.id} className="ml-10 border border-border rounded-lg bg-muted/30">
                            <Collapsible
                              open={expandedSubCategories.has(subCategory.id)}
                              onOpenChange={() => toggleSubCategory(subCategory.id)}
                            >
                              <CollapsibleTrigger asChild>
                                <div className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50">
                                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                                  {expandedSubCategories.has(subCategory.id) ? (
                                    <ChevronDown className="w-4 h-4" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                  <BookOpen className="w-4 h-4 text-primary" />

                                  {editingItem?.type === 'subcategory' && editingItem.id === subCategory.id ? (
                                    <Input
                                      value={subCategory.title}
                                      onChange={(e) => updateSubCategory(category.id, subCategory.id, { title: e.target.value })}
                                      onBlur={() => setEditingItem(null)}
                                      onKeyDown={(e) => e.key === 'Enter' && setEditingItem(null)}
                                      autoFocus
                                      className="max-w-xs"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  ) : (
                                    <span className="font-medium flex-1">{subCategory.title}</span>
                                  )}

                                  <Badge variant="outline">
                                    {subCategory.rules.length} kural
                                  </Badge>

                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingItem({ type: 'subcategory', id: subCategory.id });
                                      }}
                                    >
                                      <Pencil className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteConfirm({ type: 'subcategory', id: subCategory.id, parentId: category.id });
                                      }}
                                    >
                                      <Trash2 className="w-3 h-3 text-destructive" />
                                    </Button>
                                  </div>
                                </div>
                              </CollapsibleTrigger>

                              <CollapsibleContent>
                                <div className="px-3 pb-3 space-y-2">
                                  <Textarea
                                    value={subCategory.description}
                                    onChange={(e) => updateSubCategory(category.id, subCategory.id, { description: e.target.value })}
                                    placeholder="Alt kategori açıklaması..."
                                    className="ml-10 text-sm"
                                    rows={2}
                                  />

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addRule(category.id, subCategory.id)}
                                    className="ml-10"
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Kural Ekle
                                  </Button>

                                  {subCategory.rules.map((rule) => (
                                    <div key={rule.id} className="ml-10 p-3 border border-border rounded-lg bg-background">
                                      <div className="flex items-start gap-3">
                                        <GripVertical className="w-4 h-4 text-muted-foreground mt-1" />
                                        <FileText className="w-4 h-4 text-primary mt-1" />
                                        <div className="flex-1 space-y-2">
                                          {editingItem?.type === 'rule' && editingItem.id === rule.id ? (
                                            <>
                                              <Input
                                                value={rule.title}
                                                onChange={(e) => updateRule(category.id, subCategory.id, rule.id, { title: e.target.value })}
                                                placeholder="Kural başlığı"
                                                autoFocus
                                              />
                                              <Textarea
                                                value={rule.description}
                                                onChange={(e) => updateRule(category.id, subCategory.id, rule.id, { description: e.target.value })}
                                                placeholder="Kural açıklaması"
                                                rows={2}
                                              />
                                              <Button
                                                size="sm"
                                                onClick={() => setEditingItem(null)}
                                              >
                                                Tamam
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <div className="flex items-center justify-between">
                                                <span className="font-medium">{rule.title}</span>
                                                <div className="flex items-center gap-1">
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => setEditingItem({ type: 'rule', id: rule.id })}
                                                  >
                                                    <Pencil className="w-3 h-3" />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => setDeleteConfirm({ type: 'rule', id: rule.id, parentId: category.id, subParentId: subCategory.id })}
                                                  >
                                                    <Trash2 className="w-3 h-3 text-destructive" />
                                                  </Button>
                                                </div>
                                              </div>
                                              <p className="text-sm text-muted-foreground">{rule.description}</p>
                                              {rule.lastUpdate && (
                                                <p className="text-xs text-muted-foreground">
                                                  Son güncelleme: {formatDate(rule.lastUpdate)}
                                                </p>
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}

              {categories.length === 0 && (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Henüz kural bulunmuyor</p>
                  <Button onClick={addCategory}>
                    <Plus className="w-4 h-4 mr-2" />
                    İlk Kategoriyi Oluştur
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-foreground">Kurallar Önizleme</h3>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => togglePreviewCat(category.id)}
                    className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <span className="font-semibold text-lg">{category.id}. {category.title}</span>
                    {previewExpandedCats.includes(category.id) ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>

                  {previewExpandedCats.includes(category.id) && (
                    <div className="p-4 space-y-3">
                      {category.subCategories.map((subCategory) => (
                        <div key={subCategory.id} className="border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() => togglePreviewSub(subCategory.id)}
                            className="w-full flex items-center justify-between p-3 bg-background hover:bg-muted/30 transition-colors"
                          >
                            <span className="font-medium">{subCategory.id} {subCategory.title}</span>
                            {previewExpandedSubs.includes(subCategory.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>

                          {previewExpandedSubs.includes(subCategory.id) && (
                            <div className="p-3 space-y-2">
                              <p className="text-sm text-muted-foreground mb-3">{subCategory.description}</p>
                              {subCategory.rules.map((rule) => (
                                <div key={rule.id} className="p-3 bg-muted/30 rounded-lg">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <span className="font-medium text-primary">{rule.id}</span>
                                      <span className="font-medium ml-2">{rule.title}</span>
                                    </div>
                                    {rule.lastUpdate && (
                                      <Badge variant="outline" className="text-xs shrink-0">
                                        {formatDate(rule.lastUpdate)}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Silmek istediğinize emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteConfirm?.type === 'category' && 'Bu kategori ve içindeki tüm alt kategoriler ve kurallar silinecektir.'}
              {deleteConfirm?.type === 'subcategory' && 'Bu alt kategori ve içindeki tüm kurallar silinecektir.'}
              {deleteConfirm?.type === 'rule' && 'Bu kural kalıcı olarak silinecektir.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteConfirm?.type === 'category') {
                  deleteCategory(deleteConfirm.id);
                } else if (deleteConfirm?.type === 'subcategory' && deleteConfirm.parentId) {
                  deleteSubCategory(deleteConfirm.parentId, deleteConfirm.id);
                } else if (deleteConfirm?.type === 'rule' && deleteConfirm.parentId && deleteConfirm.subParentId) {
                  deleteRule(deleteConfirm.parentId, deleteConfirm.subParentId, deleteConfirm.id);
                }
              }}
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Import Confirmation Dialog */}
      <AlertDialog open={importConfirm} onOpenChange={setImportConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Varsayılan kuralları yükle</AlertDialogTitle>
            <AlertDialogDescription>
              Mevcut kurallar silinecek ve varsayılan kurallar yüklenecektir. Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={handleImportDefaults}>
              Yükle
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const RulesEditor = () => {
  return (
    <AdminLayout activeTab="kurallar">
      <RulesEditorContent />
    </AdminLayout>
  );
};

export default RulesEditor;
